import React from 'react'
import { Form, Input, Button, Row, Col, Alert } from 'antd'
import styles from './style.module.scss'
import { useSignUp } from './provider'
import { Link, Redirect } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { SignupMutationFn } from 'graphql/autogenerated'
import { Spin } from 'app/components/Spin'
export interface ISignupProps {
  onSignup: SignupMutationFn
}

export function SignUp(props: ISignupProps) {
  const { formSignUp, onSignup, initialUserState, data, loading, error } = useSignUp(props)

  if (!loading && data) {
    return <Redirect to="/sign-in" />
  }

  return (
    <div className={styles.loginContainer}>
      <Row className={styles.containerWrapper}>
        <Col xs={11} className={styles.rightContent}>
          <h1>Glad to see you!</h1>
          <h3>Sign-up your account</h3>
        </Col>
        <Col xs={13}>
          <Row className={styles.leftContent}>
            <Col xs={24} className={styles.title}>
              <h1>Hello, friend!</h1>
            </Col>
            <Col xs={18}>
              {!loading && error && <Alert type="error" message={error.message} banner className={styles.labelError} />}
              <Spin tip="Loading..." spinning={loading}>
                <Form name="basic" initialValues={initialUserState} form={formSignUp} onFinish={onSignup}>
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
                  <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className={styles.loginFormBtn}>
                      Sign up
                    </Button>
                    <div className={styles.newAccount}>
                      <div>
                        Already have an account?{' '}
                        <Link className="text-primary" to={'/sign-in'}>
                          Sign in
                        </Link>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
