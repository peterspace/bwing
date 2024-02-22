import Image from './Image.jsx';

export default function MessageImg({ photo, index = 0, className = null }) {
  // if (!message?.photos?.length) {
  //   return '';
  // }
  if (!className) {
    className = 'object-cover';
  }
  return <Image className={className} src={photo} alt="" />;
}
