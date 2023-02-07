import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Alert } from 'antd'
import styles from './style.module.scss'
import { useSignIn } from './provider'
import { Link, Redirect } from 'react-router-dom'
import { useSettingsStore } from 'app/redux/settings'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Spin } from 'app/components/Spin'

export interface SigninPageProps {}
export function LoginPage(props: SigninPageProps) {
  const { handleSignin, isSigninSuccessfully } = useSignIn(props)
  const { loading, error, data } = isSigninSuccessfully
  const [formSignin] = Form.useForm()
  const [initialUserState] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleFinish = values => {
    handleSignin({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    })
  }

  const { currentPath } = useSettingsStore()

  if (!loading && !error && data) {
    return <Redirect to={currentPath} />
  }

  return (
    <div className={styles.loginContainer}>
      <Row className={styles.containerWrapper}>
        <Col xs={13}>
          <Row className={styles.leftContent}>
            <Col xs={24} className={styles.title}>
              <h1>Hello!</h1>
              <h3>Sign into your account</h3>
            </Col>
            <Col xs={18}>
              {!loading && error && <Alert type="error" message={error.message} banner className={styles.labelError} />}
              <Spin tip="Loading..." spinning={loading}>
                <Form name="basic" initialValues={initialUserState} form={formSignin} onFinish={handleFinish}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Email is not a valid!' },
                    ]}
                  >
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="your.email@example.com" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input size="large" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className={styles.loginFormBtn}>
                      Sign in
                    </Button>
                    <div className={styles.newAccount}>
                      <div>
                        Don't have an account?{' '}
                        <Link className="text-primary" to={'/sign-up'}>
                          Create
                        </Link>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </Spin>
            </Col>
          </Row>
        </Col>
        <Col xs={11} className={styles.rightContent}>
          <h1>Welcome back!</h1>
          <h3>Sign into your account</h3>
        </Col>
      </Row>
    </div>
  )
}
