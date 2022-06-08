import { Result, Button } from 'antd'

function error500() {
    return (
        <Result
            status={'500'}
            title={'500'}
            subTitle={'Sorry, something went wrong.'}
            extra={
                <Button type={'primary'} onClick={() => window.history.back()}>
                    Back Home
                </Button>
            }
        />
    )
}

export default error500
