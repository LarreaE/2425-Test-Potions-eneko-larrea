export const antidoteMock = [
    {
        "_id": "6702b44f76863c206a48cce5",
        "name": "Guardian's Essence",
        "description": "A mystical essence that restores hit points to its user.",
        "value": 30,
        "effects": [
          "lesser_restore_hit_points"
        ],
        "image": "/images/ingredients/restore/restore_16.webp",
        "type": "ingredient"
      },
      {
        "_id": "6702b44f76863c206a48ccec",
        "name": "Enduring Root",
        "description": "A robust root that fortifies the constitution and endurance.",
        "value": 20,
        "effects": [
          "lesser_restore_constitution"
        ],
        "image": "/images/ingredients/restore/restore_23.webp",
        "type": "ingredient"
      },
]

export const falseAntidoteMock = [
  {
      "_id": "6702b44f76863c206a48cce5",
      "name": "Guardian's Essence",
      "description": "A mystical essence that restores hit points to its user.",
      "value": 30,
      "effects": [
        "lesser_restore_hit_points"
      ],
      "image": "/images/ingredients/restore/restore_16.webp",
      "type": "ingredient"
    },
    {
      "_id": "6702b44f76863c206a48cce5",
      "name": "Guardian's Essence",
      "description": "A mystical essence that restores hit points to its user.",
      "value": 30,
      "effects": [
        "lesser_restore_hit_points"
      ],
      "image": "/images/ingredients/restore/restore_16.webp",
      "type": "ingredient"
    },
]

export const gravechillMock = {
  "modifiers": {
    "hit_points": -45,
    "intelligence": 0,
    "dexterity": 0,
    "insanity": 0,
    "charisma": 0,
    "constitution": -9,
    "strength": 0
  },
  "_id": "6693fd5846527d0df5f0eff6",
  "name": "Gravechill",
  "description": "A necrotic illness that fills the body with a deathly cold, slowing down vital functions and causing decay.",
  "type": "illness",
  "antidote_effects": [
    "lesser_restore_hit_points",
    "lesser_restore_constitution"
  ],
  "poison_effects": [
    "lesser_damage_hit_points",
    "lesser_damage_constitution"
  ]
}