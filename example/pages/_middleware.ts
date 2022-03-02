import { NextRequest, NextResponse } from 'next/server'
import countryRegion from '../libs/amesh.json'

export async function middleware(req: NextRequest) {
    const { nextUrl: url, geo } = req
    const country = url.searchParams.get('country') || geo?.country
    const endpoint = getEndpoint(country)

    url.searchParams.set('country', country as string)
    url.searchParams.set('endpoint', endpoint || '')

    return NextResponse.rewrite(url)
}

function getEndpoint(country: string | undefined): string | undefined {
    if (country == undefined) {
        return "https://us.prsc.xiaojian.biz"
    }

    const res = countryRegion.find((item: { name: string; region: string }) => {
        if (item.name === country) {
            return item.region
        }
    })

    if (!res) {
        return "https://us.prsc.xiaojian.biz"
    }

    switch (res.region) {
        case 'Asia':
            return "https://sgp.prsc.xiaojian.biz"
        default:
            return "https://us.prsc.xiaojian.biz"
    }
}