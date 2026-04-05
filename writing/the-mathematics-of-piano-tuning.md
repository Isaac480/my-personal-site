---
title: Why it is Mathematically Impossible to Tune a Piano
description: "Beauty in an Imperfect Solution"
image: /static/img/posts/piano-math.png
date: "2022-06-12"
---



AROUND 600 B.C.E, Pythagoras discovered that intervals between music notes always have whole number ratios. When he played a string exactly double the length of another, or 2/1, the two sounds were an octave apart from each other. If the strings were in the ratio 3/2, a perfect fifth was created. Another way to conceptualize intervals is by reasoning that the initial string will vibrate three periods, or complete cycles, in the same span of time that it takes the other to vibrate two times.

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/math-piano1.png" alt="assdf"
         style="height:300px; width:auto; object-fit: contain;">
    <figcaption>Intervals as fractions between the fundamental pitch and overtones.</figcaption>
  </figure>

Some of these pitch combinations sound pure and natural, while others sound off-putting and unstable. The perceived sound depends on how the peaks of these sound waves align themselves. When the periods between two frequencies are in a simple ratio, our brains perceive it as balanced and pleasing, because harmony causes certain auditory neurons to fire rhythmically. Using the perfect fifth interval, Pythagoras’ successors constructed a scale that was used until the 16 century. The way it worked was this: two perfect fifths are stacked on top of each other to create a major ninth interval. Through octave equivalence, the resulting note is a whole step above the original note, and has a frequency 9/8 of the original. If this process is repeated six times for the six whole steps in the scale, we should end up with a note one octave higher than our original note. Because of this, the ending note should be in a 2/1 ratio with the starting note. The problem: (9/8)^6 = 2.0272… which does not equal 2. While this result is less than 2% off the desired ratio, the compounding effect over a multi-octave instrument results in noticeably out of tune intervals. Trying to use other intervals also fails: three major thirds gives (5/4)^3 = 1.9531…, minor thirds gives (6/5)^4= 2.0736, half steps gives (16/15)^12= 2.1694…  In fact, it is mathematically impossible to tune a piano using Pythagoras’ perfect harmonics. Irrational numbers cannot be expressed as the ratio of two integers. Therefore:
For any integers a, b and n with n>1, then:  

(a/b) != n√(2)  

So then how can this 88-stringed instrument be tuned? The answer lies in irrational numbers. One octave consisting of twelve keys would have to distribute the 2/1 frequency ratio evenly throughout. If we let x equal the ratio between any two successive half steps:  

x^12 = 2  
x = 12√2

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/math-piano2.png" alt="assdf"
         style="height:400px; width:auto; object-fit: contain;">
    <figcaption>Diagram showing tuning with various intervals</figcaption>
  </figure>

The ratio between any two successive notes is 12√2, which is the basis of the equal-tempered tuning system developed in the 17th century and still used for the piano today. The catch: apart from the octave, none of the intervals are mathematically perfect. Consequently, it is mathematically impossible to tune a piano perfectly, whether using pure ratios or equal-temperament. However, it just so happens that powers of 12√2 are remarkably close to integer ratios (seen in fig. 2): so close that the differences from Pythagoras’ harmonics are indistinguishable to our ears. The result is a beautiful instrument with an enormous range of notes.

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
  <figure style="margin: 0; text-align: center; flex: 1;">
    <img src="/static/img/posts/math-piano3.png" alt="assdf"
         style="height:auto; width:auto; object-fit: contain;">
    <figcaption>Ratio between harmonic, associated harmonic ratio, and powers of 12√2. HFR: Harmonic Frequency Ratio</figcaption>
  </figure>