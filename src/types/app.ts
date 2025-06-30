export interface PageProps {
  [key: string]: unknown
}

export interface PageLayoutProps {
  Component: React.ComponentType<PageProps>
  props: PageProps
}