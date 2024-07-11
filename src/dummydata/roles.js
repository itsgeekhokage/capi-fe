export const roles = [
    {
        "roleName": "Admin",
        "assignedUsers": 32,
        "controls": [
            { "name": "Create User", "route": "/create-user" },
            { "name": "Edit User", "route": "/edit-user" },
            { "name": "Delete User", "route": "/delete-user" }
        ]
    },
    {
        "roleName": "Manager",
        "assignedUsers": 15,
        "controls": [
            { "name": "View Reports", "route": "/view-reports" },
            { "name": "Manage Projects", "route": "/manage-projects" }
        ]
    },
    {
        "roleName": "Employee",
        "assignedUsers": 100,
        "controls": [
            { "name": "View Tasks", "route": "/view-tasks" },
            { "name": "Submit Timesheet", "route": "/submit-timesheet" }
        ]
    },
    {
        "roleName": "Supervisor",
        "assignedUsers": 8,
        "controls": [
            { "name": "Approve Leave", "route": "/approve-leave" },
            { "name": "Manage Shifts", "route": "/manage-shifts" }
        ]
    },
    {
        "roleName": "Developer",
        "assignedUsers": 50,
        "controls": [
            { "name": "View Code Repositories", "route": "/view-code-repositories" },
            { "name": "Commit Changes", "route": "/commit-changes" }
        ]
    },
    {
        "roleName": "Tester",
        "assignedUsers": 20,
        "controls": [
            { "name": "Run Tests", "route": "/run-tests" },
            { "name": "Report Bugs", "route": "/report-bugs" }
        ]
    },
    {
        "roleName": "Designer",
        "assignedUsers": 12,
        "controls": [
            { "name": "Create Designs", "route": "/create-designs" },
            { "name": "Review Designs", "route": "/review-designs" }
        ]
    },
    {
        "roleName": "Customer Support",
        "assignedUsers": 25,
        "controls": [
            { "name": "Answer Inquiries", "route": "/answer-inquiries" },
            { "name": "Resolve Complaints", "route": "/resolve-complaints" }
        ]
    },
    {
        "roleName": "Finance Manager",
        "assignedUsers": 5,
        "controls": [
            { "name": "Approve Expenses", "route": "/approve-expenses" },
            { "name": "Generate Financial Reports", "route": "/generate-financial-reports" }
        ]
    },
    {
        "roleName": "HR Coordinator",
        "assignedUsers": 7,
        "controls": [
            { "name": "Recruit Employees", "route": "/recruit-employees" },
            { "name": "Handle Employee Benefits", "route": "/handle-employee-benefits" }
        ]
    }

]