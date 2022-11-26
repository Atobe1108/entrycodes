const getIdeal = () => {
        const next_data = document.getElementById("__NEXT_DATA__");
        const data_parse = JSON.parse(next_data.innerText);
        return {csrf: data_parse.props.initialProps.csrfToken, xtoken: data_parse.props.initialState.common.user.xToken};
    };
const {csrf, xtoken} = getIdeal();
