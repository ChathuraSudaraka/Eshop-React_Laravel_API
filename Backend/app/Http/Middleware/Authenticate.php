<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // If the request expects JSON, return null to handle the authentication error in JSON.
        if ($request->expectsJson()) {
            return null;
        }

        // Check the requested route and redirect accordingly.
        $route = $request->route()->getName();

        if (in_array($route, ['user.profile', 'admin.profile'])) {
            // Redirect to the login page for user and admin profile routes.
            return route('login');
        }

        // Default redirect to the login page.
        return route('login');
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$guards
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards)
    {
        // Add custom logic here if needed before the authentication check.

        // Call the parent handle method for the default authentication check.
        return parent::handle($request, $next, ...$guards);
    }
}
