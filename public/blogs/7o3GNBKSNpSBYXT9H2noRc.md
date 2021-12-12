```meta
{
    "title": "Hello",
    "description": "It`s nice to have you here.",
    "tag": "generic",
    "created": "2020-09-04T18:46:02.412000+00:00",
    "updated": null,
    "id": "7o3GNBKSNpSBYXT9H2noRc"
}
```

```sketch
preload:
    data.fontsize = 100;
    data.font = p.loadFont('/fonts/SourceSansPro-Bold.otf');
    data.lNoisOffset = [10, 20, 30, 40, 50, 60, 70, 80];
    data.lNoisOffsetY = [10, 20, 30, 40, 50, 60, 70, 80];
    data.lPos = [];
    for (let i = 0; i < 8; i++){
        const pos = data.size.width * i / 8 + 80;
        data.lPos.push(pos);
    }
    data.lLetter = ['W', 'o', 'r', 'l', 'd', '<', '3'];
    data.lColor = ['#ffc0cb', '#ff0018', '#ffa52c', '#ffff41', '#008018','#0000f9', '#4B0082', '#ee82ee'];

setup:
    p.createCanvas(data.size.width, 150);
    p.textFont(data.font);
    p.textSize(data.fontsize);
    p.frameRate(60);
    p.textAlign(p.CENTER, p.CENTER);
    p.noiseSeed(1);

draw: 
    const updatePos = function(pos) {
        data.lNoisOffset[pos] = data.lNoisOffset[pos] + 0.01;
        if (data.lNoisOffset[pos]>10000)
            data.lNoisOffset[pos] = 0;
        data.lNoisOffsetY[pos] = data.lNoisOffsetY[pos] + 0.01;
        if (data.lNoisOffsetY[pos]>10000)
            data.lNoisOffsetY[pos] = 0;
        return [data.lNoisOffset[pos], data.lNoisOffsetY[pos]];
    }

    const drawLetter = function(pos, letter) {
        let posOff = p.noise(data.lNoisOffset[pos]) - 0.5;
        let posOffY = p.noise(data.lNoisOffsetY[pos]) - 0.5;
        p.text(letter, data.lPos[pos] + posOff * 50, 50 + posOffY * 50);
    }

    p.background(255);
    for (let i = 0; i < data.lLetter.length; i++) {
        p.fill(data.lColor[i]);
        const update = updatePos(i);
        data.lNoisOffset[i] = update[0];
        data.lNoisOffsetY[i] = update[1];
        drawLetter(i, data.lLetter[i]);
    }

```

## FAQ

### But... why?
- Want to be one of those cool devs who have a blog.

### Honestly, why?
- Motivating myself to improve my documentations
- Be able to share my thoughts
- Kudos to Andrew Trask and his motivating words in Grokking Deep Learning

### Why does it look so "minimalistic", is something not loading?
Everything is fine. It`s as it should be.


