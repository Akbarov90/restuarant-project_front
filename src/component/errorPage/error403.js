import { Result, Button } from 'antd'

function error403() {
    return (
        <Result
            status={'403'}
            title={'403'}
            subTitle={'Sorry, something went wrong.'}
            extra={
                <Button type={'primary'} onClick={() => window.history.back()}>
                    Back Home
                </Button>
            }
        />
    )
}

export default error403
