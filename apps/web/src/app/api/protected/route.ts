import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    // This endpoint requires Clerk authentication
    // Check authentication using Clerk's auth() function
    const { userId, orgId, orgRole } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Authentication required'
        },
        { status: 401 }
      );
    }

    // Generate a random UUID for demo purposes
    const randomId = crypto.randomUUID();

    // Get user info from Clerk
    const userInfo = {
      id: userId,
      orgId: orgId,
      role: orgRole,
    };

    const response = {
      message: 'This is a protected endpoint',
      random: randomId,
      timestamp: new Date().toISOString(),
      user: userInfo,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Protected endpoint error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Something went wrong'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}