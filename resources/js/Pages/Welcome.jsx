import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div>
            <h1>Welcome to Laravel</h1>
            <p>Laravel Version: {laravelVersion}</p>
            <p>PHP Version: {phpVersion}</p>
        </div>
    )
}
