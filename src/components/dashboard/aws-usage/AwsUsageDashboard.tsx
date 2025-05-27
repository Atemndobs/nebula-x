import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProgressBar } from './ProgressBar';

// Mock data - in a real app, this would come from an API
const mockAwsData = {
  overview: {
    monthlyCost: 1245.67,
    costTrend: -8.2, // percentage
    budgetUtilization: 62, // percentage
  },
  ec2: {
    instances: {
      running: 12,
      stopped: 3,
      total: 15,
    },
    utilization: {
      cpu: 42, // percentage
      memory: 58, // percentage
    },
    instanceTypes: [
      { type: 't3.medium', count: 5 },
      { type: 'm5.large', count: 7 },
      { type: 'c5.xlarge', count: 3 },
    ],
  },
  s3: {
    totalStorage: 245.8, // in GB
    buckets: [
      { name: 'nebula-logs', size: 120.5, objects: 12450 },
      { name: 'nebula-backups', size: 85.3, objects: 3200 },
      { name: 'nebula-assets', size: 40.0, objects: 1250 },
    ],
    storageClasses: [
      { class: 'STANDARD', size: 180.2 },
      { class: 'STANDARD_IA', size: 45.6 },
      { class: 'GLACIER', size: 20.0 },
    ],
  },
  iam: {
    accessKeys: {
      active: 3,
      inactive: 2,
      total: 5,
    },
    keys: [
      { id: 'AKIAEXAMPLE1', status: 'Active', created: '2025-01-15T00:00:00Z', lastUsed: '2025-05-24T14:30:00Z', age: 130 },
      { id: 'AKIAEXAMPLE2', status: 'Active', created: '2025-03-10T00:00:00Z', lastUsed: '2025-05-25T08:15:00Z', age: 76 },
      { id: 'AKIAEXAMPLE3', status: 'Inactive', created: '2024-12-01T00:00:00Z', lastUsed: '2024-12-31T23:59:59Z', age: 175 },
      { id: 'AKIAEXAMPLE4', status: 'Active', created: '2025-04-01T00:00:00Z', lastUsed: '2025-05-25T10:45:00Z', age: 54 },
      { id: 'AKIAEXAMPLE5', status: 'Inactive', created: '2024-10-15T00:00:00Z', lastUsed: '2024-12-15T12:00:00Z', age: 222 },
    ],
  },
  dynamodb: {
    tables: 8,
    items: 12500,
    size: 3.2, // in GB
    readCapacity: 500,
    writeCapacity: 200,
    tablesByStatus: [
      { status: 'ACTIVE', count: 7 },
      { status: 'CREATING', count: 1 },
      { status: 'UPDATING', count: 0 },
      { status: 'DELETING', count: 0 },
    ],
    topTables: [
      { name: 'user-sessions', items: 4500, size: 1.2 },
      { name: 'product-catalog', items: 3200, size: 0.8 },
      { name: 'order-history', items: 2800, size: 0.7 },
    ],
  },
};

export const AwsUsageDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Resources Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Monthly Cost</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-[#9c2cf3]"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${mockAwsData.overview.monthlyCost.toFixed(2)}</div>
            <p className={`text-xs ${mockAwsData.overview.costTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {mockAwsData.overview.costTrend > 0 ? '↑' : '↓'} {Math.abs(mockAwsData.overview.costTrend)}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">EC2 Instances</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-[#f64661]"
            >
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockAwsData.ec2.instances.total}</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">{mockAwsData.ec2.instances.running} running</span>,{' '}
              <span className="text-amber-400">{mockAwsData.ec2.instances.stopped} stopped</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">S3 Storage</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-[#00b4d8]"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V7.5L17.5 2H6a2 2 0 0 0-2 2v4" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M10 12v-1h4v1" />
              <path d="M10 16v-1h4v1" />
              <path d="M10 20v-1h4v1" />
              <path d="M6 12v-1h.01" />
              <path d="M6 16v-1h.01" />
              <path d="M6 20v-1h.01" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockAwsData.s3.totalStorage} GB</div>
            <p className="text-xs text-gray-400">
              Across <span className="text-white">{mockAwsData.s3.buckets.length}</span> buckets
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Budget Utilization</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-[#9c2cf3]"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockAwsData.overview.budgetUtilization}%</div>
            <div className="mt-2">
              <ProgressBar 
                value={mockAwsData.overview.budgetUtilization} 
                aria-label="Budget Utilization"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="ec2" className="space-y-4">
        <TabsList className="bg-transparent border border-white/10 p-1 rounded-lg">
          <TabsTrigger 
            value="ec2"
            className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-white/20 rounded-md px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 border border-transparent"
          >
            EC2
          </TabsTrigger>
          <TabsTrigger 
            value="s3"
            className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-white/20 rounded-md px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 border border-transparent"
          >
            S3
          </TabsTrigger>
          <TabsTrigger 
            value="iam"
            className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-white/20 rounded-md px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 border border-transparent"
          >
            IAM
          </TabsTrigger>
          <TabsTrigger 
            value="dynamodb"
            className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-white/20 rounded-md px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 border border-transparent"
          >
            DynamoDB
          </TabsTrigger>
        </TabsList>
        
        {/* EC2 Tab */}
        <TabsContent value="ec2" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Instance Types</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-right text-gray-400">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAwsData.ec2.instanceTypes.map((instance) => (
                      <TableRow key={instance.type} className="border-b border-white/5 hover:bg-white/5">
                        <TableCell className="font-medium text-white">{instance.type}</TableCell>
                        <TableCell className="text-right text-gray-300">{instance.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProgressBar 
                  value={mockAwsData.ec2.utilization.cpu} 
                  showValue 
                  className="mb-4"
                  aria-label="CPU Usage"
                />
                <ProgressBar 
                  value={mockAwsData.ec2.utilization.memory} 
                  showValue 
                  aria-label="Memory Usage"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* S3 Tab */}
        <TabsContent value="s3" className="space-y-4">
          <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-300">S3 Buckets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="text-gray-400">Bucket Name</TableHead>
                    <TableHead className="text-gray-400">Size (GB)</TableHead>
                    <TableHead className="text-right text-gray-400">Objects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAwsData.s3.buckets.map((bucket) => (
                    <TableRow key={bucket.name} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{bucket.name}</TableCell>
                      <TableCell className="text-gray-300">{bucket.size.toFixed(1)}</TableCell>
                      <TableCell className="text-right text-gray-300">{bucket.objects.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-300">Storage Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="text-gray-400">Class</TableHead>
                    <TableHead className="text-gray-400">Size (GB)</TableHead>
                    <TableHead className="text-right text-gray-400">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAwsData.s3.storageClasses.map((storageClass) => (
                    <TableRow key={storageClass.class} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{storageClass.class}</TableCell>
                      <TableCell className="text-gray-300">{storageClass.size.toFixed(1)}</TableCell>
                      <TableCell className="text-right text-gray-300">
                        {((storageClass.size / mockAwsData.s3.totalStorage) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* IAM Tab */}
        <TabsContent value="iam" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Access Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  <span className="text-green-400">{mockAwsData.iam.accessKeys.active}</span> / {mockAwsData.iam.accessKeys.total}
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-amber-400">{mockAwsData.iam.accessKeys.inactive}</span> inactive keys
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Access Key Age</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {Math.max(...mockAwsData.iam.keys.map(k => k.age))} days
                </div>
                <p className="text-sm text-gray-400">
                  Oldest active key
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-300">Access Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">Access Key ID</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Created</TableHead>
                      <TableHead className="text-gray-400">Last Used</TableHead>
                      <TableHead className="text-right text-gray-400">Age (days)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAwsData.iam.keys.map((key) => (
                      <TableRow key={key.id} className="border-b border-white/5 hover:bg-white/5">
                        <TableCell className="font-mono text-xs text-gray-300">{key.id}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            key.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800/50 text-gray-400'
                          }`}>
                            {key.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-300">{new Date(key.created).toLocaleDateString()}</TableCell>
                        <TableCell className="text-gray-300">{new Date(key.lastUsed).toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium text-white">{key.age}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DynamoDB Tab */}
        <TabsContent value="dynamodb" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Tables</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-[#00b4d8]"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V7.5L17.5 2H6a2 2 0 0 0-2 2v4" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M10 12v-1h4v1" />
                  <path d="M10 16v-1h4v1" />
                  <path d="M10 20v-1h4v1" />
                  <path d="M6 12v-1h.01" />
                  <path d="M6 16v-1h.01" />
                  <path d="M6 20v-1h.01" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockAwsData.dynamodb.tables}</div>
                <p className="text-xs text-gray-400">
                  <span className="text-green-400">{mockAwsData.dynamodb.tablesByStatus.find(t => t.status === 'ACTIVE')?.count} active</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Items</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-[#9c2cf3]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(mockAwsData.dynamodb.items / 1000).toFixed(1)}K
                </div>
                <p className="text-xs text-gray-400">
                  {mockAwsData.dynamodb.size} GB total size
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Capacity</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-[#f64661]"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-white">{mockAwsData.dynamodb.readCapacity}</span>
                  <span className="text-sm text-gray-400">read</span>
                  <span className="mx-1 text-gray-500">/</span>
                  <span className="text-2xl font-bold text-white">{mockAwsData.dynamodb.writeCapacity}</span>
                  <span className="text-sm text-gray-400">write</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Capacity units per second</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Top Tables by Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAwsData.dynamodb.topTables.map((table, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-white">{table.name}</span>
                        <span className="text-gray-300">{table.size} GB</span>
                      </div>
                      <ProgressBar 
                        value={(table.size / mockAwsData.dynamodb.size) * 100} 
                        showValue={false}
                        aria-label={`${table.name} size`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a0a2e]/80 to-[#3a0a3e]/80 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Table Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAwsData.dynamodb.tablesByStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${
                          status.status === 'ACTIVE' ? 'bg-green-500' : 
                          status.status === 'CREATING' ? 'bg-amber-500' : 
                          'bg-gray-500'
                        }`} />
                        <span className="text-sm text-gray-300">{status.status}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{status.count} tables</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AwsUsageDashboard;
