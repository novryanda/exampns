import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const sizeClasses = {
  sm: "size-9 text-xs",
  lg: "size-24 text-lg",
} as const;

export function UserListAvatar({
  name,
  imageUrl,
  size = "sm",
}: {
  readonly name: string;
  readonly imageUrl: string | null | undefined;
  readonly size?: keyof typeof sizeClasses;
}) {
  return (
    <Avatar className={`shrink-0 rounded-lg ring-1 ring-slate-100 ${sizeClasses[size]}`}>
      <AvatarImage
        key={imageUrl ?? name}
        src={imageUrl ?? undefined}
        alt={name}
        className="object-cover"
      />
      <AvatarFallback className="rounded-lg">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
