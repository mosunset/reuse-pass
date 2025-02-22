import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const errorvalue = 'unsupported_browser';
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

    let browser = '';

    if (userAgent.includes('msie') || userAgent.includes('trident/')) {
        browser = 'IE';
    } else if (userAgent.includes('edg/') || userAgent.includes('edge')) {
        browser = 'Edge';
    } else if (userAgent.includes('chrome')) {
        browser = 'Chrome';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        browser = 'Safari';
    } else if (userAgent.includes('firefox')) {
        browser = 'Firefox';
    } else {
        browser = 'その他のブラウザです';
    }

    if (
        browser !== 'Chrome' &&
        (request.nextUrl.pathname === '/' ||
            request.nextUrl.pathname.startsWith('/login')) &&
        request.nextUrl.searchParams.get('error') !== errorvalue
    ) {
        // 現在のURLをクローンし、'error' パラメータを 'unsupported_browser' に設定
        const url = request.nextUrl.clone();
        url.searchParams.set('error', errorvalue);

        // 修正したURLにリダイレクト
        return NextResponse.redirect(url);
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // ユーザーがログイン済みの場合、/login から /mypage へリダイレクト
    if (user && request.nextUrl.pathname.startsWith('/login')) {
        const url = request.nextUrl.clone();
        url.pathname = '/mypage';
        return NextResponse.redirect(url);
    }

    // ユーザーが未ログインであり、/login、/auth、/error、またはトップページ以外にアクセスした場合、/login にリダイレクト
    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth') &&
        !request.nextUrl.pathname.startsWith('/error') &&
        request.nextUrl.pathname !== '/'
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}
