import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function MyLoader() {
    const skeleton = [1, 2, 3, 4]

    return (
        <div id='table'>
            <table>
                <thead>
                    <tr>
                        <th />
                        <th />
                        <th />
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {skeleton.map(item => (
                        <tr key={item}>
                            <td>
                                <Skeleton circle width={30} height={30} />
                            </td>
                            <td>
                                <Skeleton width={250} height={30} />
                            </td>
                            <td>
                                <Skeleton width={250} height={30} />
                            </td>
                            <td>
                                <Skeleton width={250} height={30} />
                            </td>
                            <td className={'table-tools skeleton'}>
                                <div>
                                    <Skeleton circle width={30} height={30} />
                                </div>
                                <div>
                                    <Skeleton circle width={30} height={30} />
                                </div>
                                <div>
                                    <Skeleton circle width={30} height={30} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MyLoader
