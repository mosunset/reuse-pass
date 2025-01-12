'use client';

export default function ErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6 text-center ">
                <h1 className="mb-4 text-4xl font-bold text-red-600">
                    Something went wrong
                </h1>
                {/* <p className="mb-6 text-xl text-gray-700">
                    We apologize for the inconvenience. Please try again later.
                </p> */}
                <a
                    href="/"
                    className="text-lg text-blue-500 underline"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}
