import { categories } from "@/data/categories"

export default async function sitemap(){
    const siteCategories = categories.map(menu => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${menu.link}`
    }))
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
        ...siteCategories
    ]
}