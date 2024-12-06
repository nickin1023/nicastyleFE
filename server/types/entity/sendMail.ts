export type SendMailRequest = {
  type: "Contact" | "Comment";
  message: MailMessage;
};

type MailMessage = {
  name?: string | undefined;
  address?: string | undefined;
  subject?: string | undefined;
  main: string;
};

export type SendMailResponse = {
  result: "Success" | "Failure";
};
