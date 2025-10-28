import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export default function ToastSubmit({
  disabled,
  title,
  description,
}: {
  disabled?: boolean;
  title: string;
  description: string;
}) {
  return (
    <Button
      disabled={disabled}
      type="submit"
      className="bg-secondary hover:bg-accent cursor-pointer"
      onClick={() =>
        toast(title, {
          description: description + " what",
          action: {
            label: "Undo soon",
            onClick: () => console.log("Undo"),
          },
          className: "bg-secondary",
        })
      }>
      Submit
    </Button>
  );
}
