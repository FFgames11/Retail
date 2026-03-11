# Breakfast Task

This document reflects the dialogue and progression currently implemented in `script.js`.

## Scene Start
- The scene opens with a camera zoom on Rei.
- Board input is disabled during the intro.
- After the camera resets, Rald starts glowing and shows:

Rald: ...

## Main Progression
1. Talk to Rald to start the breakfast task.
2. Talk to Bjorn for bread.
3. Talk to Isei for orange juice.
4. Talk to Bjorn again for eggs.
5. Try to get the eggs, get redirected to the cabinet, obtain the mop, and clean the spill.
6. Return to the egg shelf and collect the eggs.
7. Return to Rald to finish the task.

## Rald Intro Conversation
Trigger:
- Click Rald while the breakfast task has not been resolved yet.
- Rei walks to Rald's conversation tile first.
- The camera zooms to the Rald conversation view.

Rald: Rei can you help me make breakfast?

Rald: I need bread, eggs, and orange.

### Choice Options
Choice A: Bread, eggs, and orange juice.
Choice B: Bread, milk, and apples.

### Correct Branch
Rei: Okay. Bread, eggs, and orange juice.

Rald: Great. Ask Bjorn for bread, ask Ise for the drinks, and talk to Bjorn for the eggs.

Process:
- Rald stops glowing.
- Bjorn starts glowing.
- Board input is re-enabled.

### Wrong Branch
Rei: Bread, milk, and apples?

Rald: No, that's not what I asked for.

Process:
- The choice tray appears again.
- The wrong answer button is disabled.

## Rald Reminder Before Final Completion
Trigger:
- Click Rald again after the breakfast conversation is resolved, but before eggs are obtained.

Rald: Remember, Bread, eggs, and orange juice. Ask Bjorn for bread, ask Ise for the drinks, and talk to Bjorn for the eggs.

Process:
- Rei walks to Rald first.
- This is a reminder bubble only; no choices appear.

## Bjorn Bread Conversation
Trigger:
- Click Bjorn after the Rald intro conversation is resolved.
- Rei walks to Bjorn first.
- The camera zooms to the Bjorn conversation view.

Bjorn: Need something, Rei?

### Choice Options
Choice A: Rald told me to ask you about the bread.
Choice B: I'm looking for tea.

### Correct Branch
Rei: Rald told me to ask you about the bread.

Bjorn: Check the shelf by the wall. That's where we keep it.

Process:
- The Bread Shelf starts glowing.
- Rei does not receive the bread yet.
- Board input is re-enabled so the player must click the Bread Shelf.

## Bread Shelf Pickup
Trigger:
- Click the Bread Shelf after Bjorn directs Rei there.

Process:
- Rei walks to tile `2:1`.
- A `Bread` token appears above Rei briefly.
- The Bread Shelf glow turns off.
- Bjorn stops glowing.
- Isei starts glowing.
- Board input is re-enabled.

### Wrong Branch
Rei: I'm looking for tea.

Bjorn: I don't have it here.

Process:
- The choice tray appears again.
- The wrong answer button is disabled.

## Bjorn Interim Reminder
Trigger:
- Click Bjorn after bread has been resolved, but before Isei has been resolved.

Bjorn: Talk to Isei for the drinks.

Process:
- No choice tray appears.
- This is a short reminder only.

## Isei Conversation
Trigger:
- Click Isei after the bread step is resolved.
- Rei walks to Isei first.
- The camera zooms to the Isei conversation view.

Isei: Rei, what do you need?

### Choice Options
Choice A: Orange juice for breakfast.
Choice B: Tea for breakfast.

### Correct Branch
Rei: Orange juice for breakfast.

Isei: Got it. Here, take this.

Process:
- An `Orange Juice` token appears above Rei briefly.
- Isei stops glowing.
- Bjorn starts glowing again.
- Board input is re-enabled.

### Wrong Branch
Rei: Tea for breakfast.

Isei: Not quite. That's not what Rald asked for.

Process:
- The choice tray appears again.
- The wrong answer button is disabled.

## Bjorn Eggs Conversation
Trigger:
- Click Bjorn after Isei has been resolved.
- Rei walks to Bjorn first.
- The camera zooms to the Bjorn conversation view.

Bjorn: Looking for something, Rei?

### Choice Options
Choice A: I need eggs for breakfast.
Choice B: I need soap for cleaning.

### Correct Branch
Rei: I need eggs for breakfast.

Bjorn: Sure, just take it from the Egg shelf.

Process:
- Bjorn stops glowing.
- The Egg Shelf starts glowing.
- Board input is re-enabled.

### Wrong Branch
Rei: I need soap for cleaning.

Bjorn: Hm, I don't have that for you.

Process:
- The choice tray appears again.
- The wrong answer button is disabled.

## Egg Shelf Blocked Sequence
Trigger:
- Click the Egg Shelf after the egg phase has started, before the spill is cleaned.

Rei: I can't get past this spill.

Bjorn: There's a mop in the cabinet.

Bjorn: Use that to clean the spill.

Process:
- Rei attempts to move toward the egg shelf first.
- The camera zooms to Rei, then to Bjorn.
- The Egg Shelf glow turns off.
- The Cabinet starts glowing.
- Board input is re-enabled.

## Cabinet Mop Minigame
Trigger:
- Click the Cabinet after Bjorn directs Rei there.
- Rei walks to tile `10:5` first.
- A modal opens with several emoji choices.

### Correct Cabinet Pick
Bjorn: That's the one.

Process:
- The correct emoji is the mop.
- The cabinet interaction is removed after success.
- The Spill starts glowing.
- Board input is re-enabled.

### Wrong Cabinet Pick
Bjorn: You need a mop.

Process:
- The wrong emoji becomes disabled in the modal.
- The modal reopens so the player can try again.

## Spill Cleaning Sequence
Trigger:
- Click the Spill after the mop has been obtained.
- Rei walks to the spill first.
- A cleaning progress bar appears above Rei and plays for 5 seconds.

Bjorn: You can now get the egg.

Process:
- The spill is removed from the board.
- The collider map is rebuilt so the route opens.
- The Egg Shelf starts glowing again.
- Board input is re-enabled.

## Egg Pickup
Trigger:
- Click the Egg Shelf after the spill has been cleaned.
- Rei walks to the egg shelf first.

Process:
- An `Eggs` token appears above Rei briefly.
- The Egg Shelf glow turns off.
- Rald starts glowing.
- Board input is re-enabled.

## Final Rald Conversation
Trigger:
- Click Rald after eggs have been obtained.
- Rei walks to Rald first.
- The camera zooms to the Rald conversation view.

Rei: I got everything.

Rald: Perfect. Now we can make breakfast.

Process:
- A congratulations modal opens.
- The modal includes a reset button that reloads the game.
