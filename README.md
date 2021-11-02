# team-builder-discord

Bot discord permettant de créer une équipe, de la supprimer, d'inviter des membres et de quitter cette équipe. Une catégorie d'équipe sera crée ainsi qu'un rôle

Un rôle "Capitaine" est requis sur le serveur pour le bon fonctionnment du bot.

Un fichier `config.json` est requis avec un token Discord Developer :
```json
{
    "token": "<TOKEN>"
}
```

Commandes :

`/create <equipe>` Crée une équipe avec le nom donnée en arguments

`/remove` Si le membre est capitaine alors il supprime l'équipe (rôle, catégorie, channel, son propre rôle de capitaine)

`/leave` Quitte l'équipe si il n'est pas capitaine

`/invite <pseudo>` Ajoute un membre à l'équipe
