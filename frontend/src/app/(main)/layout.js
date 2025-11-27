export default function MainLayout({ children }) {
    return (
        <div>
            <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <nav>
                    <a href="/" style={{ marginRight: '1rem' }}>Home</a>
                    <a href="/calendar" style={{ marginRight: '1rem' }}>Calendar</a>
                    <a href="/coaching">Coaching</a>
                </nav>
            </header>
            <main style={{ padding: '1rem' }}>
                {children}
            </main>
        </div>
    );
}
