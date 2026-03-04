---
title: "Small town, big internet"
date: 2022-07-04
tags:
  - personal
  - technology
  - infrastructure
---

Fibre finally arrived in [Ceres](https://www.google.com/maps/place/Ceres,+6835/@-33.397913,19.3052664,12z/data=!3m1!4b1!4m5!3m4!1s0x1dcd699073578c4b:0x392808e69c847c75!8m2!3d-33.4006883!4d19.295048)! It was a dream to have city-like-speeds in our little town.

Most of the major cities and towns in the Western Cape (our state) has fibre. With the relatively low number of people who live in Ceres, and amount having ADSL, I couldn't see how Ceres would be a high priority fibre rollout project. The town is not expanding. My best guess was 2024. But it came. 2 Years earlier! It seems there were other incentives for OpenServe, the countries oldest telecommunications company, to upgrade its network.

In this post I'll cover my personal internet journey in Ceres, the installation process and choosing the wrong ISP.

## Contents

1. [Connection History](#connection-history)
2. [Fibre Installation Process](#fibre-installation-process)
3. [Choosing the wrong Provider](#choosing-the-wrong-provider)
4. [The support nightmare](#support-nightmare)
5. [Switching to Cool Ideas](#switching-to-cool-Ideas)

## Connection history

We arrived in Ceres towards the end of 2016. I jumped on the fastest **ADSL** connection I could find: **10Mbps download and 4Mbps upload**. I think the **ping** was around **45ms**. This cost around **R 600(ZAR**) per month. At this time, team mates abroad had 100Mbps upload and download speeds and Fibre was being rolled out in major metros, like Cape Town and Johannesburg. Although I could jump on calls and do my job, I always had connection issues.

The next best step up was LTE - fixed wireless. The connection got me around **30Mbps down and 10 Mbps up**. The **ping** speed was around **26ms**. This cost around **R 1000(ZAR)** per month. With this, I could handle all my calls (the two I did per week) and downloads weren't such a pain. I had some issues with timeouts when uploading large files to the WordPress.com servers. While I was happy with this connection, it started showing it's limits when [I became team lead]({% link _posts/2022-05-02-the-team-lead-path.md %}). With fewer calls, I could handle the occasional glitch in the matrix, but having to make excuses on multiple calls, especially a few sensitive ones, I realised that LTE in Ceres is not a dependable connection. Cellphone towers have to service many, many clients and their service levels are very sporadic. Download and upload speeds were not consistent and the cheap devices you get with your contract simply cant handle the load. This was the height of frustration. 16 Months into the LTE contract . I gave up on it. What a blessing, when I realised that [fixed](https://www.vinet.co.za/) [wireless internet](https://www.vinet.co.za/) might be an option.

I always thought wireless internet was slow and unreliable, specially in bad weather, which is why I never considered it. I was not aware of the powerful advances in wireless technology. You get fibre like speeds, if you were willing to pay. I found out [Vinet](https://www.vinet.co.za/) had a solid fixed wireless package that provided me with **100Mbps down and 50Mbps up**. The **ping** speed was around **11ms** The catch. It cost **R 6299 (ZAR)**. I know that's an insane amount of money to spend on internet. But not If you consider the cost of finding a house (double the price) in Cape Town, Paarl or Stellenbosch, plus the relocation efforts. I was hoping fibre came sooner, but at least I had a decent connection option. I took it, but 3 Months into the contract, the high price start to nag me a bit and I found the lower package of **R 3299 (ZAR)** that gave **50Mbps down and 10 Mbps up** was sufficient as it still had the same ping speed.

Why are these packages so expensive? The reason being that it was a dedicated connection. You have a single antenna on the providers tower, and only you can use it. Point to point. There was no competition for bandwidth. You are also one hop away from the ISP fibre line. Ceres had Fibre, but not rolled out to the home. I could have gone on to use this for a while, even with the high price, but to my surprise, fibre came.

With fibre, I'm currently getting **500Mbps download and 250Mbps upload**. The **ping** speed is **6ms**. It costs **R 1300 (ZAR)**. The connection is solid. I didn't have any experience working with this connection as [I was on paternity leave]({% link _posts/2022-05-11-long-term-paternity-leave.md %}), but I have no doubt that it will perform much better than the fixed wireless solution.

## Fibre installation process

The installation process started when Vodacom sales people knocked on the door. They could have told me anything on that day, it didn't matter, I wanted fibre and I signed up immediately. I missed the part where they mentioned Open Serve, but more on that later. The sooner I can get Fibre, the better and after signing up, it took a week for my router and temporary LTE to arrive. Then the wait started. At this point I learned about the company doing the installation, but since I already signed up with Vodacom and had an existing contract I was fine with it all.

The other ISP who were in the process of getting municipal approval for rolling out fibre were on the back foot as it seems. Open Serve already had a clause in their contract that allowed them to upgrade their existing infrastructure. So the fibre rollout was actually a replacement of the old coper lines.

![alt](/images/blog/f3c5d4d4-6daa-4e7d-b152-c772a40cd1ba_1_105_c.jpeg)

I took my kids on a fibre drive for the first few weeks. It was so interesting to see how the rollout was progressing.

Having no Idea how the process worked, I thought every OpenServe truck was brining internet, but as I would learn, it's not that easy. The first signs of actual fibre process was in the picture above; the open serve civil contractors.

The fibre rollout had a few distinct phases, done by completely different teams. There may be other phases that I'm not aware of, but these were the ones I saw:

1. **Installing the conduit** by either using existing open serve pipes or digging up the ground and adding new ones where there were blockages. From what I could see, Ceres's infrastructure was well intact and only a few places required new trenches. This was done by a civil contractor.
2. **Blowing fibre**, which means using compressed air to push fibre cables through the conduit. At the root of the network, the cables started out with many fibre pairs and would decrease as it got to area and street level. The cable that came to our house had 8 cores, that would be split up between the few houses in our street. This phase is also where the fibre is spliced (fused together) from the box outside our house right up to the OpenServe network racks. This team is also responsible for testing all the points.
3. **Connecting the home**. This last step involved a private contractor doing an assessment and pulling in a single fibre from the street to our home. This team works with the home owner to find the best route and the installation location inside the house. The final part of this step is to splice the fibres in the road side box and then also inside the house. After which the connection is initiated. I've got the home installation pictures below.


![alt](/images/blog/d0c95ab7-d963-4f12-bd3c-fc6877b70e57_1_102_o.jpeg)
_Manhole in front fo the house._

![alt](/images/blog/2db071f3-a52c-4880-81bc-68176b2654e8_1_102_o.jpeg)
_Trench behind the house to lay pipe for thin fibre line._

![alt](/images/blog/23e0cdbb-6803-4ad9-bd3b-93812b70f2fe_1_102_o.jpeg)
_Fibre pulling process started._

![alt](/images/blog/1276f3db-275c-41c7-88d9-fcf4f9d06db3_1_102_o.jpeg)

![alt](/images/blog/0a3b2365-8d34-4348-a0ff-ef5461a09972_1_102_o.jpeg)
_running conduit up the side of the house._


![alt](/images/blog/6b8e9316-9f79-4aec-99fd-1f09b1f6837b_1_102_o.jpeg)

![alt](/images/blog/1bb78a96-222e-4797-8584-7c65946ff7f5_1_102_o.jpeg)

![alt](/images/blog/1cd51d6d-4a63-4ee7-a6de-785319e2d9c6_1_102_o.jpeg)

![alt](/images/blog/5e8fcc6a-340b-4541-859e-0d0ad61001dd_1_102_o.jpeg)
_Identifying the fibre meant for our house_

![alt](/images/blog/4ed917f3-4979-405c-9005-5fc0f95412f9_1_102_o.jpeg)
_Splicing outside the house._



![alt](/images/blog/05e95e76-ed77-426d-8f9f-182397950665_1_102_o.jpeg)


![alt](/images/blog/8d4a0281-dffa-4573-99de-6d76bb9ff8c1_1_102_o.jpeg)
_Splicing inside the house._


## Choosing the wrong provider

This is my least favourite part of the story. I was gullible and fooled. I should have known better. My desire for fibre overpowered better judgement. The mistake was simple: I thought Vodacom was the only service provider in my area. I didn't realise this, but Vodacom was merely the first respondent.

I went to smaller ISP websites and searched for fibre coverage in Ceres, and found that we're not covered. These smaller companies do not have the same marketing/sales budget. I think Vodacom had special privileged information:knowing which areas will be covered next. I knew there were better ISPs, but I wasn't sure if they covered Ceres. So I kept my contract with Vodacom.

From the start, they gave me the wrong speed. I didn't think too much of this as they can simply change it, right? I was wrongfully optimistic. The issue took much longer to be resolved. It took more than a week, which was when I realised that i'm with the wrong company. [The support process was so frustrating]({% link _posts/2022-06-09-vodacom-fibre-support-headaches.md %}). No one had any idea about the status of the issue. Imagine having to deal with this every-time there's an issues? When the most important tool for work is your internet connection, it's hard to deal with people to whom you're just another-one of the millions of subscribers they have to deal with.

This was when I attempted to cancel and learned about the \*\* T&C's. Marketing? No, nothing is ever free. I wish "free router" meant exactly that. Why not say something like discounted router, or router paid off over the first 12 months. Misleading marketing is not ok. The worst thing is the branded router is locked to their network. You unfortunately have to keep a device not fit for any other purpose, sadly a waste. Another part of the T&C's was the installation fee, which was also "free". So before being able to cancel, I had to pay for a useless router and the installation.

As I said in my [previous post]({% link _posts/2022-06-09-vodacom-fibre-support-headaches.md %}), Vodacom has ways to go in the fibre business. I don't have the energy or the time to wait for them to get it all together and decided to move to Cool Ideas, the service provider of choice for most of my Cape Town colleagues.

## Switching To Cool Ideas

It took a week for Vodacom to release my line and I was finally free to setup my connection to Cool Ideas.

The support thus far has been incredible. They call you back. They follow up. They show empathy and understanding. They try hard. Every support interaction so far has been with the right people empowered to help.

Support tickets are updated daily. There's a number I can call and there are people who care enough, or maybe have the right incentives to call me back. Multiple times a day. Even if I miss the calls. Calls are always followed up by email confirmations of the discussion.

To this kind of service, I'm a client for as long as possible.

## Closing

Having a solid internet connection is an absolute privilege. ISP's should understand that having a paying-customer is a privilege too. I'm excited about the future of service delivery with smaller companies who desire to impress.

I look forward to working again and having super fast internet as it makes work that much more enjoyable.
