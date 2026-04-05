---
title: Obsolete or Wise? 
description: "The Rise of the Creative Class and the Devaluation of the Elderly"
image: /static/img/posts/quality.png
date: "2025-12-20"
---

We can think of our society as being divided into two classes. The **creative class** can be broadly defined as occupations involved with *original knowledge production* or *cultural creation*, such as artists, scientists, and researchers. On the other hand, jobs such as construction workers, janitors, and caregivers form the backbone of society and are relatively stable across generations. Richard Florida outlines these conceptions in his book, <a href="https://s3.amazonaws.com/files.commons.gc.cuny.edu/wp-content/blogs.dir/17962/files/2021/10/Richard-Florida-The-Rise-of-the-Creative-Class-Revisited-Preface-Intro.pdf" target="_blank">The Rise of the Creative Class</a>
, arguing that the routine and physical work defining the working and service class has given way to occupations valuing novelty, self-expression, and creative problem-solving. But what implications does this trend have for social dynamics?

Researchers adapted the classic trolley problem by presenting participants with the <a href="https://www.moralmachine.net/" target="_blank">dilemma</a> of killing old people or younger people, indicating valuation of the elderly. By comparing this with publicly available datasets, they found that the higher percentage of a country's workforce consisting of "creative occupations", the more likely individuals were to kill old people. In other words, there is a correlation between the creative class and valuation of the elderly.

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/quality-dilemma.png" alt="Jira"
         style="height:250px; width:auto; object-fit: contain;">
    <figcaption>Example of a Moral Machine scenario</figcaption>
  </figure>

  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/quality-correlation1.png" alt="Linear"
         style="height:250px; width:auto; object-fit: contain;">
    <figcaption>China (blue, 7.37% creative jobs) saves the elderly far less than the U.S. (yellow, <a href="https://www.proptiger.com/guide/post/why-some-cities-are-more-creative?utm_source=chatgpt.com" target="_blank">35.22% creative jobs</a>) </figcaption>
  </figure>
</div>

But what are the causal mechanisms behind this trend? We theorize that as societies become more innovative, older people become *less useful* as repositories for *knowledge and wisdom*. As a result, whereas people traditionally have turned to their elders for wisdom and advice, they increasingly turn to search engines and younger individuals. Living in innovative enironments sparks a **creative ethos**, a sentiment of novelty and complex problem solving. As people link these traits with the youth, the result is ageism.

By priming participants with a description of the creative class, we hope to invoke this creative ethos and observe the resulting age bias. Whearas many past experiments use measures like the IAT test, we plan to use a novel <a href="https://www.stefanuddenberg.com/files/Peterson-et-al-2022-PNAS-Faces.pdf" target="_blank">face judgement technique</a> where participants rate artificially-generated faces on a number of attributes. If our theory is correct, people primed with the creative class will tend to rate younger faces as being more knowledgeable, competent, and useful to society. Before running this experiment, we will first run a correlational study measuring people's endorsement of creative class values. By adapting existing questionaires, we will ask participants questions like "are you drawn to people who challenge social conventions?", or "do you prefer developing your own methods over following standard procedures?". 

<figure>
  <img src="/static/img/posts/quality.png" class="post-image-full" alt="Artificially generated faces for various attributes">
</figure>

In addition to helping with conceptual components, I have served as the computational lead for this study. Adapting the work of Peterson et al., I used python to run statistical analyses. Each artificially generated face exists as an abstract 512-dimensional vector, so inferring attributes from the latent space requires running a linear regression. 

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/cosine-similarity.png" alt="Jira"
         style="height:300px; width:auto; object-fit: contain;">
    <figcaption>
      Attribute correlations
    </figcaption>
  </figure>

  <figure style="margin: 0; text-align: center; flex: 1;">
    <video 
      src="/static/img/posts/proj.mp4"
      style="height:220px; width:auto; object-fit: contain;"
      autoplay
      muted
      loop
      playsinline>
    </video>
    <figcaption>
      StyleGAN neural network encodes a face
    </figcaption>
  </figure>
</div>

This research has **drastic implications** for society. In a world where AI is set to transform life as we know it, we may increasingly turn to *young entrepreneurs and innovators* who we believe will shape our future. Family dynamics could change as grandparents and great-grandparents are viewed as relics of the past, older researchers could be cited less in academia as their intellectual worth becomes diminished, and older workers may find themselves systematically excluded from creative and knowledge-based industries. As a society, we might tend to disregard historical precedent, and *repeat the mistakes of our past*. Older politicians may lose the respect of the new creative class, leading to the proliferation of a new technocratic movement. While these predictions are all speculative, many of them are already beginning to take place in America today.
