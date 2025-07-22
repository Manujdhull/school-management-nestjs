import { InviterEmailsConfig } from '../environment-types.interface';

export const inviterEmailsConfig = () => ({
  inviterEmails: {
    principleEmail: process.env.PRINCIPLE_EMAIL,
    teacherEmail: process.env.TEACHER_EMAIL,
    classId: Number(process.env.CLASS_ID),
  } as InviterEmailsConfig,
});
