export default async function sitemap(){
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`
        },
    ]
}