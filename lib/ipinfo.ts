export interface ipinfoOutput {
    query: string,
    status: string,
    continent: string,
    continentCode: string,
    country: string, // country
    countryCode: string, // country code
    region: string,
    regionName: string,
    city: string, // city
    district: string,
    zip: string, // zipcode
    lat: number,
    lon: number,
    timezone: string, // tz
    offset: number,
    currency: string,
    isp: string, // isp
    org: string,
    as: string, // asn
    asname: string,
    mobile: boolean,
    proxy: boolean,
    hosting: boolean
}

interface httpbinOutput {
    args: any,
    headers: any,
    origin: string, // ip address
    url: string
}

export async function getClientIP(): Promise<string> {
    const d = await fetch("https://httpbin.org/get")
    const j: httpbinOutput = await d.json()
    return j.origin
}

export async function getClientInfo(ip:string): Promise<ipinfoOutput> {
    const d = await fetch(`http://ip-api.com/json/${ip}`)
    const j: ipinfoOutput = await d.json()
    return j
}