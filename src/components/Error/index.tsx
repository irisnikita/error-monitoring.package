/* eslint-disable @typescript-eslint/no-var-requires */
import { STATUS_UNRESOLVED } from "constants/index";
// Api
import { createIssue } from "api/issue";


type Env = "development" | "production" | "staging";
type Priority = "low" | "medium" | "high";

interface Additional {
  functionName?: string;
  path?: string;
  args?: any;
  assignee?: string;
  priority?: Priority;
}

interface PropsError {
  projectId: string;
  env: Env;
  disabled?: boolean;
}

export class Error {
  static projectId: string;
  static disabled: boolean;
  static env: Env;

  constructor(props: PropsError) {
    const { projectId, env, disabled = false } = props;

    Error.projectId = projectId;
    Error.disabled = disabled;
    Error.env = env;
  }

  initial(): void {
    const env = Error.env;
    const projectId = Error.projectId;
    const disabled = Error.disabled;

    if (!disabled) {
      window.onerror = function (message, source, lineno, colno, error) {
        const arrayMessage = (message as any).split(":");

        const checkCode =
          arrayMessage[0] + lineno + colno + arrayMessage[1] + source + Error.env;

        const issue = {
          name: arrayMessage[0],
          description: arrayMessage[1],
          environment: env,
          checkCode: checkCode,
          frame: JSON.stringify(error, Object.getOwnPropertyNames(error)),
          lineno: lineno,
          colno: colno,
          status: STATUS_UNRESOLVED,
          assignee: "",
          path: source,
          priority: "",
          detail: "",
          createTime: new Date(),
        };

        createIssue(projectId, issue);
        console.log(
          "🚀 ~ file: index.tsx ~ line 54 ~ Error ~ initial ~ issue",
          issue
        );
      };
    }
  }

  setConfig({env, projectId}: {env: any, projectId: string}): void {
    Error.env = env;
    Error.projectId = projectId;
  }

  static handleError(error: any, additional: Additional): void {
    const {assignee} = additional;
    const { message, name, fileName, lineNumber, columnNumber, stack } = error;

    const checkCode =
      name + lineNumber + columnNumber + message + additional.path + Error.env;

    const issue = {
      name: name,
      description: message,
      environment: Error.env,
      checkCode: checkCode,
      frame: JSON.stringify({ stack }),
      lineno: lineNumber,
      colno: columnNumber,
      status: STATUS_UNRESOLVED,
      assignee,
      path: additional.path || fileName,
      priority: additional.priority,
      detail: JSON.stringify(additional),
      createTime: new Date(),
    };
  
    createIssue(Error.projectId, issue);
  }
}

export default Error;
