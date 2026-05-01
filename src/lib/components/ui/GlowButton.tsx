export default function GlowButton({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      padding: '10px 20px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(45deg, #6ee7b7, #3b82f6)',
      color: 'white',
      cursor: 'pointer',
      transition: '0.3s',
      boxShadow: '0 0 10px rgba(59,130,246,0.7)'
    }}>
      {children}
    </button>
  );
}
