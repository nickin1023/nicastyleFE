export type SendMailRequest = {
  type: "Contact" | "Comment";
  message: MailMessage;
};

export type MailMessage = {
  name?: string | undefined;
  address?: string | undefined;
  subject?: string | undefined;
  main: string;
  inquiryType?: string | undefined;
  budget?: string | undefined;
  commentInfo?: CommentInfo;
};

export type CommentInfo = {
  title: string;
  id: string;
};

export type SendMailResponse = {
  result: "Success" | "Failure";
};
