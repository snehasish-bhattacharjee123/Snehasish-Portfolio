import '../styles/globals.css';

export const metadata = {
  title: 'NEURAL.DEV — AI/ML Portfolio',
  description: 'Advanced AI/ML student portfolio — machine learning, deep learning, computer vision & NLP.',
  keywords: 'AI, ML, Machine Learning, Deep Learning, Portfolio, Student',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#04040f" />
      </head>
      <body className="scan-lines">
        {children}
      </body>
    </html>
  );
}
