import toast from "react-hot-toast";

export const successToast = ({ message }: { message: string }) => {
  toast.success(message, { icon: "✅", duration: 4000 });
};

export const errorToast = ({ message }: { message: string }) => {
  toast.error(message, { icon: "❌", duration: 4000 });
};

export const loadingToast = ({
  promise,
  success,
  error,
}: {
  promise: Promise<Response>;
  success: string;
  error: string;
}) => {
  toast.promise(
    promise,
    {
      loading: "Przetwarzanie",
      success: (data) => {
        if (!data.ok) {
          throw new Error(`Status code ${data.status}`);
        }
        return success;
      },
      error: error,
    },
    {
      success: {
        icon: "✅",
      },
      error: {
        icon: "❌",
      },
      loading: {
        icon: "⏱️",
      },
      duration: 4000,
    }
  );
};
