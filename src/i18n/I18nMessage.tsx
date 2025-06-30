import React from 'react';
import { useTranslation } from 'react-i18next';

const ALLOWED_TAGS = ['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'i18n-message'] as const;
type AllowedTag = (typeof ALLOWED_TAGS)[number];

export type I18nMessageProps = React.PropsWithChildren<{
  'data-ko': string;
  className?: string;
  tag?: AllowedTag;
  htmlAttributes?: React.HTMLAttributes<HTMLElement>;
}>

export default function I18nMessage({
                                      children,
                                      'data-ko': dataKo,
                                      className,
                                      tag = 'i18n-message',
                                      htmlAttributes = {},
                                    }: I18nMessageProps): JSX.Element {
  const { i18n } = useTranslation();

  if (!ALLOWED_TAGS.includes(tag)) {
    console.warn(`Warning: 허용되지 않은 "${tag}".`);
    tag = 'i18n-message';
  }

  const props = {
    className,
    'data-ko': dataKo,
    ...htmlAttributes,
  };

  const content = i18n.language === 'ko' ? dataKo : children;

  return React.createElement(tag, props, content);
}