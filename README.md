# SchenkComposer: An Interpretable, Flexible, and Interactive Probabilistic Framework for Melody Generation

### NOTE: This is a draft for the README that goes with SchenkComposer. The code is to be released upon acceptance.

### Link To Paper:

XXXXXXXXXXXXXXXXXXX

### Abstract:
The fast-growing demand for algorithmic music generation is found throughout entertainment, art, education, etc. Unfortunately, most recent models are practically impossible to interpret or musically fine-tune, as they use deep neural networks with thousands of parameters. We introduce an interpretable, flexible, and interactive model, SchenkComposer, for melody generation that empowers users to be creative in all aspects of the music generation pipeline and allow them to learn from the process. We divide the task of melody generation into steps based on the process that a human composer using music-theoretical domain knowledge might use. First, the model determines phrase structure based on form analysis and identifies an appropriate number of measures. Using concepts from Schenkerian analysis, the model then finds a fitting harmonic rhythm, middleground harmonic progression, foreground rhythm, and melody in a hierarchical, scaffolded approach using a probabilistic context-free grammar based on musical contours. By incorporating theories of musical form and harmonic structure, our model produces music with long-term structural coherence. In extensive human experiments, we find that music generated with our approach successfully passes a Turing test in human experiments while current state-of-the-art approaches fail, and we further demonstrate superior performance and preference for our melodies compared to existing melody generation methods

## Install Dependencies

Make sure all dependencies are installed using the following commands from the project's root:

```
$ conda env create -f environment.yml
$ conda activate SchenkComposer
```

## Quickly Generate Music

If your goal is to quickly generate a bit of music, you only need to run the following code from the root of the directory:

```
$ python3 quickGeneration.py <output_path>
```

## Play With Parameters

SchenkComposer offers access to many tunable parameters that can empower you to make music unique to you.

All parameters are accessible in `config.py`. If you don't feel ready to fully customize your parameters, there are labeled presets available in `preset_params.py`

A good place to start is with the `phrase_structure` parameter, which is a series of alphabetic characters along with apostrophes to indicate variations. i.e., "a-a'-b" would indicate that you want two sections that sound similar followed by a unique bit of music.

If you have a deeper understanding of music theory, you may want to try adjusting the `harmonic_transitions` matrix to control the frequency of one harmony going to another. Without a little bit of work, labels need to be Roman numerals. If you want to customize your harmonies beyond standard Roman numerals, you can use the `pitch_set_to_roman` function in `utility.py` to convert any set of pitch classes into a valid label. 

Another important parameter is `smoothness`, which affects the potential for the melody to leap around. Higher values for `smoothness` lead to "jumpier" melodies. We recommend keeping the smoothness between 0 and 2.


## Data

As of now, SchenkComposer makes use of hierarchical analyses of Western classical music to determine many parts of the melody. Of course, hierarchical analysis is not limited to Western classical music, so if you really want to get involved in SchenkComposer's process, you can swap out `contours.json` using your own analyses. For more information on this, please see our paper.


