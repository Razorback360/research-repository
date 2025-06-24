import type { FC } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Footer: FC = () => {
  const t = useTranslations();
  
  return (
    <footer className="bg-gray-700 text-gray-300 py-6 flex w-full items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4 md:px-8">
        <div className="flex items-center space-x-2">          <div className="w-32 h-24 relative z-0">
            <Image
              src="/logo.png"
              alt={t('footer.logo.alt')}
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <span className="text-lg font-medium">{t('footer.title')}</span>
        </div>        <div className="text-sm text-center md:text-center">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            {t('footer.links.contact')}
          </a>
          <a href="#" className="hover:text-white">
            {t('footer.links.feedback')}
          </a>
          <a href="#" className="hover:text-white">
            {t('footer.links.faq')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
