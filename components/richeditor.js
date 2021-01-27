import dynamic from 'next/dynamic';

const RichEditor = dynamic(() => import('../components/editor'), { ssr: false });

export default RichEditor