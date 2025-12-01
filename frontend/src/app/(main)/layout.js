export default function MainLayout({ children }) {
    return (
        <div style={{
            backgroundColor: '#e0e0e0', // Outer background (desktop)
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '430px', // iPhone Pro Max width
                backgroundColor: 'var(--background-light)', // App background
                minHeight: '100vh',
                boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                position: 'relative'
            }}>
                {children}
            </div>
        </div>
    );
}
