
"use client";

import { useRef, useState } from "react";
import {
  Camera,
  Loader2,
  Save,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpdateProfile } from "@/hooks/use-profile";
import { useSession } from "@/lib/auth/auth-client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default function ProfileSettingsPage() {
  const {
    data: session,
    isPending: isSessionLoading,
  } = useSession();

  if (isSessionLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">
          Unable to load your profile.
        </p>
      </div>
    );
  }

  return <ProfileForm user={user} />;
}

type ProfileFormProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role?: string;
  };
};

function ProfileForm({ user }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user.image ?? "");
  const [fileError, setFileError] = useState("");

  const {
    mutate: updateProfile,
    isPending: isUpdating,
  } = useUpdateProfile();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileError("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFileError(
        "Only JPG, JPEG, PNG, and WEBP images are allowed.",
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("Image size must be less than 5MB.");

      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    updateProfile({
      name: trimmedName,
      image: selectedFile,
    });
  };

  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const isDirty =
    name.trim() !== (user.name ?? "") ||
    selectedFile !== null;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and profile picture.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        {/* Card Header */}
        <div className="border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold">
                Profile Information
              </h2>

              <p className="text-sm text-muted-foreground">
                Update your account information.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-7 p-6">
          {/* Profile Picture */}
          <div className="space-y-4">
            <div>
              <Label>Profile Picture</Label>

              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG or WEBP. Maximum file size 5MB.
              </p>
            </div>

            <div className="flex items-center">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-28 w-28 border-2">
                  <AvatarImage
                    src={previewUrl || undefined}
                    alt={name || "Profile"}
                    className="object-cover"
                  />

                  <AvatarFallback className="text-2xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* Camera Button */}
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={isUpdating}
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="rounded-lg border bg-muted/40 px-3 py-2">
                <p className="truncate text-sm font-medium">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>
              </div>
            )}

            {/* Error */}
            {fileError && (
              <p className="text-sm text-destructive">
                {fileError}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your full name"
              disabled={isUpdating}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address
            </Label>

            <Input
              id="email"
              value={user.email}
              disabled
              className="bg-muted"
            />

            <p className="text-xs text-muted-foreground">
              Email address cannot be changed from this page.
            </p>
          </div>

          {/* Role */}
          {user.role && (
            <div className="space-y-2">
              <Label htmlFor="role">
                Role
              </Label>

              <Input
                id="role"
                value={user.role}
                disabled
                className="bg-muted"
              />

              <p className="text-xs text-muted-foreground">
                Your account role is managed by an administrator.
              </p>
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end border-t pt-6">
            <Button
              onClick={handleSave}
              disabled={
                isUpdating ||
                !name.trim() ||
                !isDirty ||
                Boolean(fileError)
              }
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}