import { FC } from "react";

const Planets: FC = (props) => {
    return (
        <>
            <h1>props</h1>
        </>
    )
}

export default Planets;

export const getStaticProps = async () => {
    return {
        props: {

        }
    }
}