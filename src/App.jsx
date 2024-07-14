/** @format */

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import AdminDashboard from "./adminpanel/AdminDashboard";
import AllRoles from "./adminpanel/roles/AllRoles";
import CreateRoles from "./adminpanel/roles/CreateRole";
import AllAgents from "./adminpanel/agents/AllAgents";
import CreateAgent from "./adminpanel/agents/CreateAgent";
import EditAgent from "./adminpanel/agents/EditAgent";
import AllProjects from "./adminpanel/projects/AllProjects";
import CreateProject from "./adminpanel/projects/CreateProject";
import EditProject from "./adminpanel/projects/editproject/EditProject";
import AgentDashboard from "./agentpanel/AgentDashboard";
import QuestionList from "./agentpanel/questionlist/QuestionList";
import QuestionBoard from "./agentpanel/questionpanel/QuestionBoard";
import EditRole from "./adminpanel/roles/EditRole";
import AllControls from "./adminpanel/controls/AllControls";
import CreateControl from "./adminpanel/controls/CreateControl";
import EditControl from "./adminpanel/controls/EditControl";
import AllTags from "./adminpanel/question_tags/AllTags";
import CreateTag from "./adminpanel/question_tags/CreateTag";
import EditTag from "./adminpanel/question_tags/EditTags.jsx";
import EditProjectTag from "./adminpanel/projects/editproject/EditProjectTag.jsx";
import Static2_Type from "./adminpanel/question_tags/Static2_Type.jsx";
import Report from "./adminpanel/report/Report.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}>
          <Route
            path="roles/all"
            element={<AllRoles />}
          />
          <Route
            path="roles/create"
            element={<CreateRoles />}
          />
          <Route
            path="roles/edit"
            element={<EditRole />}
          />
          <Route path="controls/all" element={<AllControls/>}/>
          <Route path="controls/create" element={<CreateControl/>}/>
          <Route path="controls/edit" element={<EditControl/>}/>
          <Route
            path="agents/all"
            element={<AllAgents />}
          />
          <Route
            path="agents/create"
            element={<CreateAgent />}
          />
          <Route
            path="agents/edit"
            element={<EditAgent />}
          />
          <Route
            path="projects/all"
            element={<AllProjects />}
          />
          <Route
            path="projects/create"
            element={<CreateProject />}
          />
          <Route
            path="projects/edit"
            element={<EditProject />}
          />
          <Route
            path="projects/tag/create"
            element={<CreateTag />}
          />
          <Route
            path="projects/tag/edit"
            element={<EditTag />}
          />
          <Route path="tags/all" element={<AllTags/>} />
          <Route path="tags/create" element={<CreateTag/>} />
          <Route path="tags/edit" element={<EditTag/>} />
        </Route>
        <Route
          path="/agent"
          element={<AgentDashboard />}
        >
          <Route path="home" element={<QuestionList/>}/>
          <Route path="question" element={<QuestionBoard/>}/>
        </Route>
        <Route path="/report" element={<Report/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
