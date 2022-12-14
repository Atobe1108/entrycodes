const getIdeal = () => {
    const next_data = document.getElementById("__NEXT_DATA__");
    const data_parse = JSON.parse(next_data.innerText);
    return {csrf: data_parse.props.initialProps.csrfToken, xtoken: data_parse.props.initialState.common.user.xToken};
};
const {csrf, xtoken} = getIdeal();


const post = async (body) => {  return await fetch("/graphql", {method: "POST", headers: {"Content-Type": "application/json", "csrf-token": csrf, "x-token": xtoken, }, body: JSON.stringify(body)});  };


const editStory = {
remove : async (id) => {
    await post({"query":"\n    mutation REMOVE_DISCUSS($id: ID) {\n        removeDiscuss(id: $id){\n            id\n        }\n    }\n","variables":{"id":id}});
},
get : async (userId, q) => {
return await post({"query":"\n    query SELECT_ENTRYSTORY(\n    $pageParam: PageParam\n    $query: String\n    $user: String\n    $category: String\n    $term: String\n    $prefix: String\n    $progress: String\n    $discussType: String\n    $searchType: String\n    $searchAfter: JSON\n){\n        discussList(\n    pageParam: $pageParam\n    query: $query\n    user: $user\n    category: $category\n    term: $term\n    prefix: $prefix\n    progress: $progress\n    discussType: $discussType\n    searchType: $searchType\n    searchAfter: $searchAfter\n) {\n            total\n            list {\n                \n\tid\n    content\n    created\n    commentsLength\n    likesLength\n    user {\n        \n    id\n    nickname\n    username\n    profileImage {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    status {\n        following\n        follower\n    }\n    description\n    role\n\n    }\n    image {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    sticker {\n        \n    id\n    name\n    label {\n        \n    ko\n    en\n    ja\n    vn\n\n    }\n    filename\n    imageType\n    dimension {\n        \n    width\n    height\n\n    }\n    trimmed {\n        filename\n        width\n        height\n    }\n\n    }\n    isLike\n\n            }\n            searchAfter\n        }\n    }\n","variables":{"category":"free","user":userId,"term":"all","searchType":"scroll","pageParam":{"display":q,"sort":"created"}}});
}
};
const profileId = location.href.split('/')[4];
if(!profileId) {alert('[??????] ????????? ????????????????????? ??????????????????. ')}
else {
    editStory.get(profileId, prompt('??? ?????? ???????????? ??????????????????????')-1)
    .then(r=>r.json())
    .then(r=>r.data.discussList.list.forEach(e=>{editStory.remove(e.id);}))
    .then(alert('??????????????? ?????????????????????.'))
}
