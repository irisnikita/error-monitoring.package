// Libraries
import React, { useEffect, useState } from "react";

// Components
import Error from "components";

const PATH = "src/docs/App.tsx";

const error = new Error({
  projectId: "d284062f-33f0-40cb-539b-178c01fe318c",
  env: "development",
});

error.initial();

const App: React.FC = () => {
  const [value, setValue] = useState("asd");
  const [assignee, setAssignee] = useState("huongamt");
  const [form, setForm] = useState({
    projectId: "d284062f-33f0-40cb-539b-178c01fe318c",
    env: "development",
    error: "assd",
    assignee: "",
    priority: "",
  });

  useEffect(() => {
    error.setConfig({ env: form.env, projectId: form.projectId });
  }, [form.projectId, form.env]);

  const onClick = (a: any) => {
    try {
      JSON.parse('[1, 2, 3, 4,]');
    } catch (error) {
      console.log(error, 'error')
      Error.handleError(error, {
        path: PATH,
        args: [1, 2, 3],
        functionName: "onClick",
        assignee: form.assignee,
        priority: form.priority as any,
      });
    }
  };

  const onChangeForm = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Ứng dụng giả lập lỗi</h1>
      <table style={{ width: 500 }}>
        <tbody>
          <tr>
            <td style={{ width: 50 }}>Project id</td>
            <td>
              <input
                name="projectId"
                value={form.projectId}
                onChange={onChangeForm}
              />
            </td>
          </tr>
          <tr>
            <td>Environment</td>
            <td>
              <select
                id="cars"
                name="env"
                value={form.env}
                onChange={onChangeForm}
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Assignee</td>
            <td>
              <input
                name="assignee"
                value={form.assignee}
                onChange={onChangeForm}
              />
            </td>
          </tr>
          <tr>
            <td>Priority</td>
            <td>
              <select
                id="cars"
                name="priority"
                value={form.priority}
                onChange={onChangeForm}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Error</td>
            <td>
              <input
                name="error"
                value={form.error}
                onChange={onChangeForm}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={onClick}>Send error</button>
    </div>
  );
};

export default App;

[
  {"title": "", "link": "", "answerId": ""},
  {"title": "", "link": "", "answerId": ""},
  {"title": "", "link": "", "answerId": ""},
]