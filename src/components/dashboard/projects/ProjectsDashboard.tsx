import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done' | 'blocked' | 'review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies?: number[];
  details?: string;
  testStrategy?: string;
  dueDate?: string;
  assignee?: string;
  projectId?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  lastUpdated: string;
  status: 'on-track' | 'at-risk' | 'behind';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    lastUpdated: '2025-05-24T14:30:00Z',
    status: 'on-track',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build a cross-platform mobile application',
    progress: 45,
    totalTasks: 36,
    completedTasks: 16,
    lastUpdated: '2025-05-25T09:15:00Z',
    status: 'at-risk',
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party services with our backend',
    progress: 20,
    totalTasks: 15,
    completedTasks: 3,
    lastUpdated: '2025-05-20T11:45:00Z',
    status: 'behind',
  },
];

const getStatusBadge = (status: Task['status']) => {
  switch (status) {
    case 'done':
      return <Badge variant="success">Done</Badge>;
    case 'in-progress':
      return <Badge variant="default">In Progress</Badge>;
    case 'review':
      return <Badge variant="outline">In Review</Badge>;
    case 'blocked':
      return <Badge variant="destructive">Blocked</Badge>;
    case 'pending':
    default:
      return <Badge variant="secondary">Pending</Badge>;
  }
};

const getPriorityBadge = (priority: Task['priority']) => {
  switch (priority) {
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'high':
      return <Badge variant="default">High</Badge>;
    case 'medium':
      return <Badge variant="outline">Medium</Badge>;
    default:
      return <Badge variant="secondary">Low</Badge>;
  }
};

export const ProjectsDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/tasks/tasks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by status (done first) and then by ID
    if (a.status === 'done' && b.status !== 'done') return -1;
    if (a.status !== 'done' && b.status === 'done') return 1;
    return a.id - b.id;
  });
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'on-track':
        return 'text-green-400';
      case 'at-risk':
        return 'text-amber-400';
      case 'behind':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* 
        Customer Header Section
        Displays the customer name and a generated customer ID
        - Uses a gradient background matching the theme
        - Shows the customer name in large, bold text
        - Generates a unique customer ID with format: NLX-{year}-{random 4 digits}
      */}
      <div className="bg-gradient-to-r from-[#1a0a2e] to-[#3a0a3e] p-6 rounded-lg border border-white/10">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold text-white">Nebula Logix</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Customer ID:</span>
            <span className="text-sm font-mono bg-white/10 px-2 py-0.5 rounded">
              NLX-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}
            </span>
          </div>
        </div>
      </div>

      {/* Main dashboard title */}
      <h2 className="text-2xl font-bold text-white">Project Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Projects</CardTitle>
            <div className="h-4 w-4 text-[#f64661]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockProjects.length}</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">
                {mockProjects.filter(p => p.status === 'on-track').length} on track
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Tasks</CardTitle>
            <div className="h-4 w-4 text-[#00b4d8]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {tasks.length}
            </div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">
                {tasks.filter(t => t.status === 'done').length} completed
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Overall Progress</CardTitle>
            <div className="h-4 w-4 text-[#9c2cf3]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.round(
                mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length
              )}
              %
            </div>
            <div className="mt-2">
              <Progress
                value={
                  mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length
                }
                className="h-2 bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Active Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold text-white">
                    {project.name}
                  </CardTitle>
                  <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{project.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="font-medium text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2 bg-gray-700" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>
                      {project.completedTasks} of {project.totalTasks} tasks
                    </span>
                    <span>Updated {formatDate(project.lastUpdated)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-white/10 bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 backdrop-blur-sm flex flex-col h-[800px]">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-xl">All Tasks</CardTitle>
          <CardDescription>Overview of all tasks across projects</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="rounded-md border border-white/10 flex-1 flex flex-col overflow-hidden">
            <div className="overflow-y-auto flex-1 max-h-[calc(800px-120px)]">
              <Table>
                <TableHeader className="sticky top-0 bg-[#1a0a2e] z-10">
                  <TableRow>
                    <TableHead className="min-w-[250px]">Task</TableHead>
                    <TableHead className="min-w-[180px]">Project</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[100px]">Priority</TableHead>
                    <TableHead className="w-[150px]">Assignee</TableHead>
                    <TableHead className="text-right w-[120px]">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">Loading tasks...</p>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-red-400">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : sortedTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-white/5">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>#{task.id} {task.title}</span>
                          <span className="text-xs text-gray-400 line-clamp-1">{task.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>Nebula Logix</span>
                          <span className="text-xs text-gray-400">
                            {task.dependencies && task.dependencies.length > 0 
                              ? `Depends on #${task.dependencies.join(', #')}`
                              : 'No dependencies'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell className="text-sm text-gray-300">
                        {task.assignee || 'Unassigned'}
                      </TableCell>
                      <TableCell className="text-right text-sm text-gray-300">
                        {task.dueDate 
                          ? format(parseISO(task.dueDate), 'MMM d, yyyy')
                          : 'No due date'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  );
};
