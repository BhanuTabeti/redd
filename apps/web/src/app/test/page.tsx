'use client';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { useState } from 'react';

interface ApiResponse {
  status: string;
  timestamp?: string;
  environment?: string;
  version?: string;
  message?: string;
  random?: string;
  user?: {
    id: string;
    orgId?: string;
    role?: string;
  };
  error?: string;
}

export default function TestPage() {
  const { user } = useUser();
  const [healthResponse, setHealthResponse] = useState<ApiResponse | null>(null);
  const [protectedResponse, setProtectedResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<{ health: boolean; protected: boolean }>({
    health: false,
    protected: false
  });

  const testHealth = async () => {
    setLoading(prev => ({ ...prev, health: true }));
    try {
      const res = await fetch('/api/health');
      const data: ApiResponse = await res.json();
      setHealthResponse(data);
    } catch {
      setHealthResponse({
        status: 'error',
        error: 'Failed to fetch health endpoint'
      });
    }
    setLoading(prev => ({ ...prev, health: false }));
  };

  const testProtected = async () => {
    setLoading(prev => ({ ...prev, protected: true }));
    try {
      const res = await fetch('/api/protected');
      const data: ApiResponse = await res.json();
      setProtectedResponse(data);
    } catch {
      setProtectedResponse({
        status: 'error',
        error: 'Failed to fetch protected endpoint'
      });
    }
    setLoading(prev => ({ ...prev, protected: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">REDD Auth Test</h1>

          {/* User Status Section */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Status:</h2>

            <SignedOut>
              <div className="text-gray-600">
                <p>You are not signed in.</p>
                <SignInButton>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✓ Logged in successfully</p>
                <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
                <p><strong>User ID:</strong> {user?.id}</p>
                {user?.organizationMemberships && user.organizationMemberships.length > 0 && (
                  <div>
                    <p><strong>Organization:</strong> {user.organizationMemberships[0]?.organization?.name}</p>
                    <p><strong>Role:</strong> {user.organizationMemberships[0]?.role}</p>
                  </div>
                )}
                <div className="mt-4">
                  <UserButton afterSignOutUrl="/test" />
                </div>
              </div>
            </SignedIn>
          </div>

          {/* API Tests Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">API Tests:</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Health Test */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Health Endpoint (Public)</h3>
                <button
                  onClick={testHealth}
                  disabled={loading.health}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading.health ? 'Testing...' : 'Test Health Endpoint'}
                </button>

                {healthResponse && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Response:</h4>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(healthResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Protected Test */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Protected Endpoint (Auth Required)</h3>
                <button
                  onClick={testProtected}
                  disabled={loading.protected}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading.protected ? 'Testing...' : 'Test Protected Endpoint'}
                </button>

                {protectedResponse && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Response:</h4>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(protectedResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">How to Test:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>If not signed in, click the &quot;Sign In&quot; button above</li>
              <li>Sign up/sign in with your preferred method</li>
              <li>Once logged in, your user info will appear above</li>
              <li>Test the Health endpoint (should work for everyone)</li>
              <li>Test the Protected endpoint (requires authentication)</li>
              <li>Verify the responses contain expected data</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}