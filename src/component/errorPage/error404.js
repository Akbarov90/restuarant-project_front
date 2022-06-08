import { Result, Button } from 'antd'

function error404({ history }) {
    return (
        <Result
            status={'404'}
            title={'404'}
            subTitle={'Sorry, something went wrong.'}
            extra={
                <Button type={'primary'} onClick={() => history.push('/')}>
                    Back Home
                </Button>
            }
        />
    )
}

export default error404
