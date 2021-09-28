import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

function getLookAt(mesh) {
  var lookAt = new THREE.Vector3(0, 0, -1);
  var euler = new THREE.Euler(0, 0, 0, 'XYZ');

  euler.copy(mesh.rotation);

  lookAt.applyEuler(euler);
  lookAt.add(mesh.position);
  return lookAt;
}

export function transition(object3D, target, dur, easing) {
  const init = {};
  const dest = {};

  const attrs = ['x', 'y', 'z', 'r', 'g', 'b', 'opacity'];

  function setInit(key) {
    const keyArr = key.split('_');
    let subObj = object3D;

    keyArr.forEach((subKey) => {
      subObj = subObj[subKey];
    });
    init[key] = subObj;
  }

  if (object3D instanceof THREE.Vector3 && target instanceof THREE.Vector3) {
    // 向量
    ['x', 'y', 'z'].forEach((pos) => {
      init[pos] = object3D[pos];
      dest[pos] = target[pos];
    });
  } else {
    // object3d or material
    // eslint-disable-next-line
    for (const key in target) {
      let destKey = key;

      if (key === 'lookAt') {
        const initLookAt = object3D.userData.lookAt || getLookAt(object3D);
        ['x', 'y', 'z'].forEach((lookAtKey) => {
          init[`lookAt_${lookAtKey}`] = initLookAt[lookAtKey];
          dest[`lookAt_${lookAtKey}`] = target.lookAt[lookAtKey];
        });
      } else {
        if (/color/i.test(key) > 0 && !(target[key] instanceof THREE.Color)) {
          target[key] = new THREE.Color(target[key]);
        }
        if (typeof target[key] === 'object') {
          for (const cKey in target[key]) {
            destKey = key;
            if (attrs.indexOf(cKey) !== -1) {
              destKey += `_${cKey}`;
              dest[destKey] = target[key][cKey];
              setInit(destKey);
            }
          }
        } else {
          dest[destKey] = target[key];
          setInit(destKey);
        }
      }
    }
  }
  const tween = new TWEEN.Tween(init);
  tween
    .to(dest, dur)
    .easing(easing || TWEEN.Easing.Cubic.InOut)
    .onUpdate(function (current) {
      // console.log(current);
      // eslint-disable-next-line
      for (const currentKey in current) {
        if (currentKey.indexOf('lookAt') === -1) {
          const keyArr = currentKey.split('_');
          const last = keyArr.pop();
          let subObj = object3D;
          keyArr.forEach((key) => {
            subObj = subObj[key];
          });
          subObj[last] = current[currentKey];
        }
      }

      if (typeof current.lookAt_x !== 'undefined') {
        object3D.lookAt(new THREE.Vector3(current.lookAt_x, current.lookAt_y, current.lookAt_z));
      }
    });
  return tween;
}
