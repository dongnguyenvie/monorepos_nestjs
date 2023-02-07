import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Menu, Grid } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import { ROUTES, DEFAULT_ROUTE, PAGE_NOTFOUND } from 'router/routes'
import { RouteExtensionProps } from 'types/Utils'
import { NavigationLeft } from './components/NavigationLeft'
import styles from './style.module.css'
// import { Footer } from './components/Footer'
import { useLayoutDefault } from './provider'
import { navigationLst } from 'utils/navigation'
import { Spin } from 'app/components/Spin'

const { Header, Content, Sider } = Layout
const { useBreakpoint } = Grid

const loading = () => (
  <Spin spinning={true} size="large">
    <div>Loading...</div>
  </Spin>
)

export function LayoutDefault() {
  const { collapsed, setCollapse, menuSelected, handleUpdateMenu, handleRedirectPage, theme } = useLayoutDefault()
  const screen = useBreakpoint()

  const isMd = screen.md

  useEffect(() => {
    setCollapse(!isMd)
  }, [isMd])

  const goHompage = () => {
    window.open('/', '_blank')
  }
  return (
    <Layout className={styles.wrapper}>
      <Sider collapsible collapsed={collapsed} onCollapse={e => setCollapse(e)} className={!collapsed ? 'pc-menu' : ''}>
        <div className="logo" />
        <div className={styles.navWrapper}>
          <NavigationLeft
            navigationData={navigationLst}
            theme={theme}
            onActiveMenuItem={handleUpdateMenu}
            menuKeySelected={menuSelected.keySelected}
            // menuKeyOpened={menuSelected.keyOpened}
            menuKeyOpened={[]}
            onRedirectPage={handleRedirectPage}
          />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className={styles.btnToggleNavigation}>
          <span>{collapsed ? <MenuUnfoldOutlined onClick={() => setCollapse(false)} /> : <MenuFoldOutlined onClick={() => setCollapse(true)} />}</span>
          <Menu theme="dark" mode="horizontal" style={{ maxWidth: '80%', marginLeft: '1.5em', fontSize: 17 }}>
            <Menu.Item onClick={goHompage}>Trang chủ</Menu.Item>
          </Menu>
        </Header>
        <Content className={styles.contentWrapper}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className={styles.contentInner}>
            <Suspense fallback={loading()}>
              <Switch>
                {ROUTES.map((route, idx) => {
                  return <Route<RouteExtensionProps> key={idx} path={route.path} exact={route.exact} name={route!.name} render={props => (route.component ? <route.component {...props} /> : null)} />
                })}
                <Redirect from="/" exact={true} to={DEFAULT_ROUTE} />
                <Redirect from="*" exact={true} to={PAGE_NOTFOUND} />
              </Switch>
            </Suspense>
          </div>
        </Content>
        {/* <Footer /> */}
      </Layout>
    </Layout>
  )
}
