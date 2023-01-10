import { useGetRegionAnatomiquesQuery } from "./regionAnatomiquesApiSlice"
import { Link } from "react-router-dom";

const RegionAnatomiquesList = () => {
    const {
        data: regionAnatomiques,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRegionAnatomiquesQuery()

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <section className="regionAnatomiques">
                <h1>Region Anatomiques</h1>
                <ul>
                    {regionAnatomiques.map((regionAnatomique, i) => {
                        return <li key={i}>{regionAnatomique.nom}</li>
                    })}
                </ul>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default RegionAnatomiquesList